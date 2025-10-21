import type { Dishe } from "@/types/global";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Image } from "@imagekit/react";
import { config } from "@/lib/config";
import { Hamburger, Star } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { useDishes } from "./dishes-provider";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface Props {
  data: Dishe[];
}

const DishesGrid = ({ data }: Props) => {
  const { setOpen, setCurrentItem } = useDishes();

  return (
    <div className="mt-8">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((dish) => (
            <ContextMenu key={dish.idDish}>
              <ContextMenuTrigger>
                <Card className="flex flex-col p-4 bg-transparent border-0 shadow-none">
                  <Image
                    urlEndpoint={config.env.urlEndpointImageKit}
                    src={dish.imageDish}
                    alt={dish.nameDish}
                    className="object-cover w-full h-64 rounded-md"
                  />
                  <CardContent className="flex-1 px-0 mt-3 space-y-1">
                    <CardTitle className="text-2xl font-bold">
                      {dish.nameDish}
                    </CardTitle>
                    <p className="text-md text-orange-500 font-semibold">
                      {dish.category_name}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-1.5 items-center">
                        {[1, 2, 3, 4].map((_, i) => (
                          <Star key={i} size={20} className="text-yellow-400" />
                        ))}
                        <Star size={20} className="text-gray-400" />
                        <p className="text-md text-gray-500 ml-1">4</p>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        {Math.trunc(Number(dish.price))} CFA
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ContextMenuTrigger>

              <ContextMenuContent className="w-64">
                <ContextMenuLabel>Actions sur le plat</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuItem
                  onSelect={() => {
                    setCurrentItem(dish);
                    setOpen("details");
                  }}
                >
                  Informations supplémentaires
                </ContextMenuItem>
                <ContextMenuItem
                  onSelect={() => {
                    setCurrentItem(dish);
                    setOpen("update");
                  }}
                >
                  Modifier le plat
                </ContextMenuItem>
                <ContextMenuItem
                  onSelect={() => {
                    setCurrentItem(dish);
                    setOpen("delete");
                  }}
                  className="text-red-600"
                >
                  Supprimer le plat
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      ) : (
        <Empty className="flex justify-center items-center w-full h-100">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Hamburger />
            </EmptyMedia>
            <EmptyTitle className="text-3xl font-semibold">
              Aucun plat trouvé
            </EmptyTitle>
            <EmptyDescription className="text-center text-lg">
              Vous n'avez pas encore ajouté de plats à votre restaurant.
              Commencez par en créer un pour le voir apparaître ici.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              size="lg"
              onClick={() => {
                setOpen("create");
              }}
            >
              Nouveau Plat
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};

export default DishesGrid;
