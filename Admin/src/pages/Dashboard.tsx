import React, { useContext, useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import AuthContext from "@/contexts/authContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const Dashboard = () => {
  const [history, setHistory] = useState([])
  useEffect(() => {
    // Load todos from localStorage when the component mounts
    const storedTodos = JSON.parse(localStorage.getItem('history'));
    if (storedTodos) {
      setHistory(storedTodos);
    }
  }, []);

  const [rentData, setRentData] = useState(null);
  const [vechileData, setVechileData] = useState(null);
  const { toast } = useToast();
  const { getToken } = useContext(AuthContext);
  const [data, setData] = useState(null);


  const fetchRentData = async () => {
    await axios
      .get(`http://localhost:5000/api/request/${getToken()}`)
      .then((res) => {
        setRentData(res.data.requests);
      })
      .catch((_err) => {
        toast({ description: "data fetching failed", variant: "destructive" });
      });
  };
  const fetchData = async () => {
    await axios
      .get(`http://localhost:5000/api/request/${getToken()}`)
      .then((res) => {
        setData(res.data.requests);
      })
      .catch((_err) => {
        toast({ description: "data fetching failed", variant: "destructive" });
      });
  };
  const fetchVechileData = async () => {
    await axios.get(`http://localhost:5000/api/vehicle/${getToken()}`)
      .then(res => {
        setVechileData(res.data.vehicles);
      })
      .catch(err => {
        toast({ description: "data fetching failed", variant: "destructive" })
      })
  }

  const totalPrice = vechileData?.reduce((total, item) => parseInt(total) + parseInt(item?.perDayPrice), 0);
  useEffect(() => {
    fetchRentData();
    fetchData();
    fetchVechileData();
  }, []);

  return (
    <div className="p-3 flex gap-4 items-start w-full h-full">
      <div className="w-3/5">
        <div className="grid grid-cols-3 gap-4">

          <CardComponent title="Total Vechiles" count={vechileData?.length} />
          <CardComponent title="Total Requests" count={rentData?.length} />
          <CardComponent title="Total Revenue Per Day" count={"Rs " + totalPrice} />
        </div>
        <div className="mt-6 mb-2 font-semibold text-xl">Rent requests</div>
        <div className="w-full border text-sm">

          <Table>
            <TableHeader>
              <TableRow className="font-semibold bg-gray-600 text-white hover:bg-gray-600">
                <TableCell>Customer Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Vechicle Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data ? (
                data?.map((request) => {
                  return (
                    <TableRow className="border-b-2 bg-white">
                      <TableCell>{request?.userName}</TableCell>
                      <TableCell>{request?.address}</TableCell>
                      <TableCell>{request?.vehicleNumber}</TableCell>
                      <TableCell>{request?.date}</TableCell>
                      <TableCell>{request?.duration} days</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <div>Data not available</div>
              )}
            </TableBody>
          </Table>
        </div>
        {/* <CardComponent title="Total Users" count={19} /> */}
      </div>
      <Card className="w-2/5 flex flex-col gap-2 p-4 ">
        <p className="font-semibold text-lg">Recent History</p>
        {
          history?.map((item) => {
            return <div key={item?.id} className="border relative px-3 py-2 flex flex-col hover:shadow-md rounded-lg">
              <p className="font-semibold">{item?.history?.vehicleNumber}</p>
              <p className="text-base text-gray-600">{item?.history?.vehicleModal}</p>
              <p className="text-green-600 bg-green-100 absolute text-sm  px-2 top-0 right-0 rounded-lg">Product added</p>
            </div>
          })
        }

      </Card>
    </div>
  );
};

const CardComponent = ({ title, count }: { title: string, count: number }) => {
  return (
    <Card className=" text-center">
      <CardHeader className="text-lg font-semibold">{title}</CardHeader>
      <CardContent className="w-full text-xl font-bold">{count}</CardContent>
    </Card>
  );
};

export default Dashboard;
