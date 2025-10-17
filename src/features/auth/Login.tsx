import Logo from '@/assets/auth/Logo_Fast_Food.jpg'
import {FormAuth} from "@/lib/validations.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { z} from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Link} from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {useState} from "react";
import {useUser} from "@/hooks/useUser.ts";
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"


export default  function LoginPage() {
    const {loginUser} = useUser()
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const form  = useForm<z.infer<typeof FormAuth>>({
        resolver : zodResolver(FormAuth),
        mode : "onChange" ,
        defaultValues : {
            email : "" ,
            password : ""
        }
    })
    const onSubmit = async  (values : z.infer<typeof  FormAuth>)=> {
        setError(null);

        try{
            const response = await loginUser(values)
            if(!response.success) {
                setError("Email ou mot de passe incorrect.")
            }
            if(error){
                toast.error('Erreur lors de la connexion' , {
                    description: error,
                })
            }else {
                toast.success('Vous êtes connecté')
            }
        }catch (error) {
            console.error(error)
        }finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div className="flex flex-col gap-4 w-full h-full">
                <div className="flex flex-col space-y-4 items-center py-8">
                    <div className="logo">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className="mt-4">
                        <div>
                            <h1 className="font-semibold leading-6 text-3xl">Bienvenu sur votre application</h1>
                            <p className="text-center my-2 text-gray-500 text-lg">
                                Entrer les details pour vous connecter
                            </p>
                        </div>
                    </div>
                </div>
                <div className="formLogin">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="m@gmail.com" {...field}
                                                   className="rounded-sm py-2 px-4 h-10 shadow-none focus-visible:border-transparent focus-visible:ring-ring/50 focus-visible:ring-[1px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field}
                                                   className="rounded-sm py-2 px-4 h-10 shadow-none focus-visible:border-transparent focus-visible:ring-ring/50 focus-visible:ring-[1px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1 justify-center">
                                    <Checkbox/>
                                    <Label>Se souvenir de moi</Label>
                                </div>
                                <Button variant="link" asChild>
                                    <Link to="#" >
                                        Mot de passe oublié ?
                                    </Link>
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                className={`w-full ${(!form.formState.isValid || loading) ? "bg-gray-200 text-black cursor-not-allowed" : ""}`}
                                disabled={!form.formState.isValid || loading}
                            >
                                {loading ? (
                                    <>
                                        {/* Spinner simple en SVG */}
                                        <Spinner className="size-3"/>
                                        Connexion
                                    </>
                                ) : (
                                    "Se connecter"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}