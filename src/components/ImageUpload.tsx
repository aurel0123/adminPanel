import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import { useRef, useState } from "react";
import axiosClient from "@/api/axiosClient.ts";
import { Upload, Loader2, CheckCircle, XCircle, X } from "lucide-react";
import * as React from "react";

interface ImageUploadProps {
    value?: string;
    onChange?: (value: string) => void;
    onUploadComplete?: (result: any) => void;
    folder?: string;
    acceptedTypes?: string;
    maxSize?: number; // en bytes
    className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
                                                     value,
                                                     onChange,
                                                     onUploadComplete,
                                                     folder = "/Logo_Restaurants",
                                                     acceptedTypes = "image/*",
                                                     maxSize = 10 * 1024 * 1024, // 10MB par défaut
                                                     className = ""
                                                 }) => {
    // State to keep track of upload status
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [uploadMessage, setUploadMessage] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Create a ref for the file input element to access its files easily
    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * Authenticates and retrieves the necessary upload credentials from the server.
     */
    const authenticator = async () => {
        try {
            const response = await axiosClient.get("/api/auth/imagekit/");

            if (response.status !== 200) {
                const errorText = JSON.stringify(response.data);
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const { signature, expire, token, publicKey } = response.data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    /**
     * Creates image preview from file
     */
    const createImagePreview = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    /**
     * Clears image preview
     */
    const clearImagePreview = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setUploadStatus('idle');
        setUploadMessage('');
        onChange?.('');
    };

    /**
     * Validates file before upload
     */
    const validateFile = (file: File): string | null => {
        // Check file type
        if (!file.type.startsWith('image/')) {
            return 'Veuillez sélectionner une image valide';
        }

        // Check file size
        if (file.size > maxSize) {
            return `La taille du fichier ne doit pas dépasser ${maxSize / (1024 * 1024)}MB`;
        }

        return null;
    };

    /**
     * Handles the file upload process automatically when file is selected
     */
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            return;
        }

        const file = files[0];

        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
            setUploadStatus('error');
            setUploadMessage(validationError);
            setTimeout(() => {
                setUploadStatus('idle');
                setUploadMessage('');
            }, 3000);
            return;
        }

        // Create preview
        createImagePreview(file);

        // Start upload
        await handleUpload(file);
    };

    /**
     * Handles the file upload process
     */
    const handleUpload = async (file: File) => {
        setUploadStatus('uploading');
        setUploadMessage('Upload en cours...');

        // Create a new AbortController for each upload
        const abortController = new AbortController();

        try {
            const authParams = await authenticator();
            const { signature, expire, token, publicKey } = authParams;

            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                // Use provided folder or default
                folder: folder,
                // Progress callback
                onProgress: (event) => {
                    console.log(`Progress: ${(event.loaded / event.total) * 100}%`);
                },
                // Abort signal
                abortSignal: abortController.signal,
            });

            setUploadStatus('success');
            setUploadMessage('Upload réussi !');

            // Call onChange with the uploaded image URL
            if (uploadResponse.url) {
                onChange?.(uploadResponse.url);
            }

            // Call the upload complete callback
            onUploadComplete?.(uploadResponse);

            // Réinitialiser après 3 secondes
            setTimeout(() => {
                setUploadStatus('idle');
                setUploadMessage('');
            }, 3000);

        } catch (error) {
            setUploadStatus('error');

            // Handle specific error types
            if (error instanceof ImageKitAbortError) {
                setUploadMessage('Upload annulé');
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                setUploadMessage('Requête invalide');
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                setUploadMessage('Erreur réseau');
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                setUploadMessage('Erreur serveur');
                console.error("Server error:", error.message);
            } else {
                setUploadMessage('Erreur lors de l\'upload');
                console.error("Upload error:", error);
            }

            // Réinitialiser après 5 secondes en cas d'erreur
            setTimeout(() => {
                setUploadStatus('idle');
                setUploadMessage('');
            }, 5000);
        }
    };

    /**
     * Handle drag and drop events
     */
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');

        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];

            // Validate file
            const validationError = validateFile(file);
            if (validationError) {
                setUploadStatus('error');
                setUploadMessage(validationError);
                setTimeout(() => {
                    setUploadStatus('idle');
                    setUploadMessage('');
                }, 3000);
                return;
            }

            createImagePreview(file);
            handleUpload(file);
        }
    };

    return (
        <div className={`max-w-md mx-auto p-6 ${className}`}>
            {/* Zone de preview ou de drag & drop */}
            {imagePreview || value ? (
                <div className="relative">
                    {/* Preview de l'image */}
                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <img
                            src={imagePreview || value}
                            alt="Preview"
                            className="w-full h-64 object-cover"
                        />

                        {/* Overlay avec statut */}
                        {(uploadStatus === 'uploading' || uploadStatus === 'success' || uploadStatus === 'error') && (
                            <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
                                uploadStatus === 'success' ? 'bg-green-900 bg-opacity-40' :
                                    uploadStatus === 'error' ? 'bg-red-900 bg-opacity-40' : ''
                            }`}>
                                {uploadStatus === 'uploading' && (
                                    <div className="text-center text-white">
                                        <Loader2 className="w-12 h-12 text-orange-400 mx-auto mb-2 animate-spin" />
                                        <p className="text-orange-200 font-medium">{uploadMessage}</p>
                                    </div>
                                )}

                                {uploadStatus === 'success' && (
                                    <div className="text-center text-white">
                                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                                        <p className="text-green-200 font-medium">{uploadMessage}</p>
                                    </div>
                                )}

                                {uploadStatus === 'error' && (
                                    <div className="text-center text-white">
                                        <XCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
                                        <p className="text-red-200 font-medium">{uploadMessage}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Bouton pour changer l'image */}
                    <div className="flex gap-2 mt-3">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Changer l'image
                        </button>

                        <button
                            type="button"
                            onClick={clearImagePreview}
                            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Supprimer
                        </button>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept={acceptedTypes}
                        className="hidden"
                    />
                </div>
            ) : (
                /* Zone de drag & drop classique */
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
                        uploadStatus === 'uploading'
                            ? 'border-blue-300 bg-blue-50'
                            : uploadStatus === 'success'
                                ? 'border-green-300 bg-green-50'
                                : uploadStatus === 'error'
                                    ? 'border-red-300 bg-red-50'
                                    : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept={acceptedTypes}
                        className="hidden"
                    />

                    {uploadStatus === 'idle' && (
                        <>
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">
                                Glissez votre image ici ou cliquez pour sélectionner
                            </p>
                            <p className="text-sm text-gray-500">
                                PNG, JPG, JPEG jusqu'à {maxSize / (1024 * 1024)}MB
                            </p>
                        </>
                    )}

                    {uploadStatus === 'uploading' && (
                        <>
                            <Loader2 className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-spin" />
                            <p className="text-orange-600 font-medium">{uploadMessage}</p>
                        </>
                    )}

                    {uploadStatus === 'success' && (
                        <>
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <p className="text-green-600 font-medium">{uploadMessage}</p>
                        </>
                    )}

                    {uploadStatus === 'error' && (
                        <>
                            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-600 font-medium">{uploadMessage}</p>
                        </>
                    )}
                </div>
            )}



        </div>
    );
};

export default ImageUpload;