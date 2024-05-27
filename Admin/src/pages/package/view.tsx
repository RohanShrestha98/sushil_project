import { useContext, useEffect, useState } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { MdDelete } from "react-icons/md";
import AuthContext from '@/contexts/authContext'

interface VehicleType {
    _id: string,
    displayImage: string,
    vehicleModal: string,
    vehicleNumber: string,
    category: string,
    available: boolean,
    perDayPrice: number,
    description: string,
    vendor: string
}
const View = () => {
    const [data, setData] = useState<VehicleType[] | null>(null);
    const { toast } = useToast();
    const {getToken} = useContext(AuthContext);

    const fetchData = async () => {
        await axios.get(`http://localhost:5000/api/vehicle/${getToken()}`)
            .then(res => {
                setData(res.data.vehicles);
            })
            .catch(err => {
                toast({ description: "data fetching failed", variant: "destructive" })
            })
    }

    const deletePackage = async (id: string) => {
        await axios.delete(`http://localhost:5000/api/vehicle/remove/${id}`)
            .then(_res => {
                toast({ description: "vehicle deleted" })
                fetchData();
            })
            .catch(_err => {
                toast({ description: "data fetching failed", variant: "destructive" })
            })
    }

    useEffect(() => {
        fetchData();
    }, []) 
    

    return (
        <div className='w-full bg-blue-200'>
            <Table>
                <TableHeader>
                    <TableRow className='font-semibold'>
                        <TableCell>Image</TableCell>
                        <TableCell>Vehicle Name</TableCell>
                        <TableCell>Vehicle Number</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Per Day Price</TableCell>
                        <TableCell>Available</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map(item => {
                            return <TableRow>
                                <TableCell className='flex items-center justify-center'>
                                    <img className='h-10' src={item.displayImage} alt="" />
                                </TableCell>
                                <TableCell>{item.vehicleNumber}</TableCell>
                                <TableCell>{item.vehicleModal}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.perDayPrice}</TableCell>
                                <TableCell>{!item.available ? <div className='w-2 h-2 rounded-lg bg-red-400'/> : <div className='w-2 h-2 rounded-lg bg-green-400'/>}</TableCell>
                                <TableCell>
                                    <Button variant={"destructive"} onClick={() => deletePackage(item._id)}>
                                        <MdDelete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default View