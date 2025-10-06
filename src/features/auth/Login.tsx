import Logo from '../../assets/auth/Logo_Fast_Food.jpg'
import { Form } from "radix-ui";
import  './styles.css';
import {Text, Flex, Checkbox, Link, Button} from "@radix-ui/themes";

export default  function LoginPage() {
    return (
        <div>
            <div className="flex flex-col gap-4 w-full h-full">
                <div className="flex flex-col space-y-4 items-center py-8">
                    <div className="logo">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className="mt-4">
                        <div>
                            <h2 className="font-semibold leading-6 text-3xl">Bienvenu sur votre application</h2>
                            <p className="text-center my-2 text-gray-500 text-lg">
                                Entrer les details pour vous connecter
                            </p>
                        </div>
                    </div>
                </div>
                <div className="formLogin">
                    <Form.Root className="FormRoot">
                        <Form.Field className="FormField" name="email">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Form.Label className="FormLabel">Email</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Please enter your email
                                </Form.Message>
                                <Form.Message className="FormMessage" match="typeMismatch">
                                    Please provide a valid email
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input className="Input" type="email" required placeholder="johndeo@gmail.com"/>
                            </Form.Control>
                        </Form.Field>
                        <Form.Field className="FormField" name="password">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Form.Label className="FormLabel">Mot de passe</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Please enter a question
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input className="Input"  type="password" required placeholder="********" />
                            </Form.Control>
                        </Form.Field>
                        <div className="flex w-full justify-between my-4">
                            <div>
                                <Text as="label" size="2">
                                    <Flex gap="2">
                                        <Checkbox defaultChecked />
                                        Se souvenir de moi
                                    </Flex>
                                </Text>
                            </div>
                            <div>
                                <Link href="#" underline="always">Mot de passe oublié ?</Link>
                            </div>
                        </div>
                        <Form.Submit asChild >
                            <Flex direction="column" gap="3">
                                <Button className="w-full" size="3">
                                    Se connecter
                                </Button>
                                <Text as="span" className="text-center text-gray-400">
                                    Vous n'aves pas votre application?
                                    <Link href="#" underline="always">
                                        S'inscrire
                                    </Link>
                                </Text>
                            </Flex>
                        </Form.Submit>

                    </Form.Root>
                </div>
            </div>
        </div>
    )
}