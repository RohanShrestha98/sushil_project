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
        await axios.post("http://localhost:5000/api/vendor/login", data)
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
                console.log("err", err?.response?.data?.message)
                toast({ description: err?.response?.data?.message, variant: "destructive" });
            })
    }

    return (
        <div className='grid grid-cols-2  h-screen'>
            <div className='bg-blue-200'></div>
            <Card className='  px-28 py-32'>
                <div className='flex flex-col gap-1 items-center mb-10'>
                    <h1 className='text-xl font-semibold'>Login</h1>
                    <h1 className='text-base text-gray-600 font-medium'>Enter your credintials her to login as vendor</h1>
                </div>
                <CardDescription>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-2 items-start'>
                            <Label>
                                Email
                            </Label>
                            <Input placeholder='Enter your email' {...register("email", { required: true })} type='email' />
                        </div>
                        <div className='flex flex-col gap-2 items-start'>
                            <Label>
                                Password
                            </Label>
                            <Input placeholder='Enter your password' {...register("password", { required: true })} type='password' />
                        </div>
                        <Button className='mt-4'>Login</Button>
                    </form>
                </CardDescription>
            </Card>
        </div>

    )
}

export default Login