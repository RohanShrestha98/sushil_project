import { useContext } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import AuthContext from '@/contexts/authContext';

import axios from 'axios';


interface LoginPropType {
    email: string;
    password: string;
}


const Login = () => {
    const { register, handleSubmit } = useForm<LoginPropType>();
    const { toast } = useToast();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const onSubmit = async (data: any) => {
        await axios.post("http://localhost:5000/api/admin/login", data)
            .then(res => {
                console.log("res", res)
                toast({ description: "Login Successful" });
                login({
                    email: data.email,
                    token: res.data.id,
                })
                localStorage.setItem('vendorID', JSON.stringify(res?.data?.id));
                navigate("/");
            })
            .catch(err => {
                toast({ description: "Login Failed", variant: "destructive" });
            })
    }

    return (
        <Card className='w-2/3 h-2/3 p-10'>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardDescription>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-2 items-start'>
                        <Label>
                            Email
                        </Label>
                        <Input {...register("email", { required: true })} type='email' />
                    </div>
                    <div className='flex flex-col gap-2 items-start'>
                        <Label>
                            Password
                        </Label>
                        <Input {...register("password", { required: true })} type='password' />
                    </div>
                    <Button>Login</Button>
                </form>
            </CardDescription>
        </Card>
    )
}

export default Login