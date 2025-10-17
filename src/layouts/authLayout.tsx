import {Outlet} from "react-router-dom";
import bgAuth from '../assets/auth/bg-auth.png';
import bgAuth2 from '../assets/auth/bg-auth2.png' ;
import vector from '../assets/auth/Vector.png'
import bgDishes from '../assets/auth/bgDishes.png';
import { Toaster } from "@/components/ui/sonner"

export default function AuthLayout() {
    return (
        <div className="flex w-full h-screen">
            <Toaster/>
            <section className="w-1/2 h-full bg-gray-100 overflow-hidden p-2">
                <div className="w-full h-full rounded-xl overflow-hidden bg-[#FE754A] relative">
                    <div className=" flex flex-col h-1/2 justify-center items-center px-2">
                        <h1 className="font-bold text-center text-white">
                            Simplifiez la gestion de votre restaurant
                        </h1>
                        <span className="px-4 py-4 text-md font-medium text-gray-100 text-center">
                            Notre tableau de bord vous permet de piloter facilement vos commandes, équipes,
                            stocks et ventes.
                        </span>
                    </div>
                    <div  className="h-1/2 relative flex ">
                        <div className="absolute left-4 -bottom-20 z-10">
                            <img src={bgDishes} alt="Image background" width={500} height={500} />
                        </div>
                        <div className="absolute right-2 -bottom-20 z-10">
                            <img src={bgDishes} alt="Image background" width={330} height={330} />
                        </div>
                    </div>
                    <div className="absolute bottom-10 -right-10">
                        <img src={bgAuth} alt="Image background" width={500} height={500} />
                    </div>
                    <div className="absolute left-0 -top-50">
                        <img src={bgAuth2} alt="Image background" width={600} height={600}/>
                    </div>
                    <div className="absolute -left-10 -bottom-10">
                        <img src={vector} alt="image background" width={300} height={300}/>
                    </div>
                </div>
            </section>
            <section className="w-1/2 h-full p-2">
                <Outlet />
            </section>
        </div>
    )
}