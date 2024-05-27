import { useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '@/contexts/authContext'


const Add = () => {

    const { register, handleSubmit, setValue, watch } = useForm();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [history, setHistory] = useState([])
    const [image, setImage] = useState("");
    const { getToken } = useContext(AuthContext);
    useEffect(() => {
        // Load todos from localStorage when the component mounts
        const storedTodos = JSON.parse(localStorage.getItem('history'));
        if (storedTodos) {
            setHistory(storedTodos);
        }
    }, []);

    const onSubmit = (data: any) => {
        const formData = new FormData();

        Object.keys(data).forEach(item => {
            formData.append(item, data[item])
        })

        if (image) {
            formData.append('image', image)
        }

        formData.append("vendor", getToken())

        axios.post('http://localhost:5000/api/vehicle/add', formData)
            .then(_res => {
                toast({ description: 'vehicle added' });
                const updatedHistory = [...history, { id: Date.now(), history: data }];
                setHistory(updatedHistory);
                localStorage.setItem('history', JSON.stringify(updatedHistory));
                navigate('/package');
            })
            .catch(_err => {
                toast({ description: 'error' });
            })
    }

    return (
        <div className='w-full'>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Add Vehicles
                    </CardTitle>
                </CardHeader>
                <CardDescription>
                    <form className='flex flex-col p-5 gap-5 bg-blue-200' onSubmit={handleSubmit(onSubmit)} action="">
                        <div className='flex flex-col gap-2 items-start'>
                            <Label>Vehicle Name</Label>
                            <Input {...register('vehicleNumber', { required: true })} />
                        </div>
                        <div className='flex flex-col gap-2 items-start'>
                            <Label>Category</Label>
                            <Select onValueChange={value => setValue("category", value)} defaultValue={watch("category")}>
                                <SelectTrigger>
                                    <SelectValue placeholder="select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={'CAR'}>CAR</SelectItem>
                                    <SelectItem value={"BIKE"}>BIKE</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-2 items-start'>
                            <Label>Vehicle Number</Label>
                            <Input {...register('vehicleModal', { required: true })} />
                        </div>
                        <div className='flex flex-col gap-2 items-start'>
                            <Label>Display Image</Label>
                            <Input onChange={(e) => setImage(e.target.files[0])} type='file' />
                        </div>
                        <div className='flex flex-col gap-2 items-start'>
                            <Label>Per day Price</Label>
                            <Input {...register('perDayPrice', { required: true })} />
                        </div>
                        <div className='flex flex-col gap-2 items-start'>
                            <Label>Description</Label>
                            <Textarea {...register('description', { required: true })} />
                        </div>
                        <Button type='submit'>Add Vehicle</Button>
                    </form>
                </CardDescription>
            </Card>
        </div>
    )
}


export default Add