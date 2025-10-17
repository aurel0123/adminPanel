import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RestaurantForm } from "@/lib/validations.ts";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImagekitUpload from "@/components/ImagekitUpload.tsx";
import {createRestaurant} from "@/api/restaurant.api.ts";
import {toast} from "sonner"
import { Toaster } from "@/components/ui/sonner"
import {useNavigate} from "react-router-dom";


export default function CreateRestaurant() {
    const [step, setStep] = useState<number>(1);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof RestaurantForm>>({
        resolver:zodResolver(RestaurantForm),
        defaultValues: {
            nameRestaurant: "",
            imageRestaurant: "",
            location: "",
            latitude:0,
            longitude:0,
        },
    });

    const handleBack = () => {
        setStep(1);
    };

    const handleNext = async() => {
        const valid = await form.trigger(["nameRestaurant" , "imageRestaurant" , "location"])
        if(valid) {
            setStep(2);
        }

    };

    const onSubmit = async (data: z.infer<typeof RestaurantForm>) => {
        try {
            const response = await createRestaurant(data);
            if(!response) {
                throw new Error("Erreur lors de la creation");
            }
            toast.success("Restaurant créé avec success")
            form.reset();

            navigate('/restaurateur/tableau-de-bord')
        }catch (error) {
            console.error(error);

        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-6">
            <Toaster/>
            <div className="w-full max-w-2xl border-0">
                <div className="space-y-1 pb-8 pt-8">
                    <div className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        Nouveau restaurant
                    </div>
                    <p className="text-center text-BASE">
                        Étape {step} sur 2 — {step === 1 ? "Informations générales" : "Localisation"}
                    </p>
                    <div className="pt-4">
                        <div className="flex items-center justify-center gap-2">
                            <div className={`h-2 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                            <div className={`h-2 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                        </div>
                    </div>
                </div>

                <div className="pb-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {/* Étape 1 */}
                            <div className={step === 1 ? "space-y-4" : "hidden"}>
                                <FormField
                                    control={form.control}
                                    name="nameRestaurant"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Nom du restaurant <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Le Gourmet"
                                                    {...field}
                                                    className="rounded-sm py-2 px-4 h-12"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="imageRestaurant"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Image restaurant <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <ImagekitUpload
                                                    folder="/LogoRestaurant"
                                                    acceptedFileTypes="image/*"
                                                    onUploadSuccess={(url) => {
                                                        field.onChange(url); // ⚠️ Lier l'URL à react-hook-form
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Adresse <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="123 Rue de la République, Paris"
                                                    {...field}
                                                    className="rounded-sm py-2 px-4 h-12"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end">
                                    <Button type="button" onClick={handleNext}>
                                        Continuer
                                    </Button>
                                </div>
                            </div>

                            {/* Étape 2 */}
                            <div className={step === 2 ? "space-y-4" : "hidden"}>
                                <Alert className="bg-orange-50 border-orange-200">
                                    <MapPin className="h-4 w-4 text-blue-600" />
                                    <AlertDescription className="text-blue-800">
                                        Entrez les coordonnées GPS du restaurant pour la géolocalisation
                                    </AlertDescription>
                                </Alert>

                                <FormField
                                    control={form.control}
                                    name="latitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Latitude <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="48.8566"
                                                    {...field}
                                                    onChange={(e) => field.onChange(+e.target.value)} // Force conversion
                                                    className="rounded-sm py-2 px-4 h-12"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="longitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Longitude <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="2.3522"
                                                    {...field}
                                                    onChange={(e) => field.onChange(+e.target.value)} // Force conversion
                                                    className="rounded-sm py-2 px-4 h-12"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-2 justify-end">
                                    <Button type="button" onClick={handleBack} variant="outline">
                                        Retour
                                    </Button>
                                    <Button type="submit">
                                        Créer le restaurant
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
