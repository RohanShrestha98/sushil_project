import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";


interface RequestType {
  _id: string;
  userName: string;
  userContact: string;
  address: string;
  vehicleNumber: string;
  vehicleModal: string;
  date: string;
  duration: string;
  approved: "Pending" | "approved" | "rejected";
}
const View = () => {
  const [data, setData] = useState<RequestType[] | null>(null);
  const { toast } = useToast();
  const { getToken } = useContext(AuthContext);

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

  const handleApprove = async (id: string) => {
    if (id === null || id === "") {
      toast({ description: "no request with this id", variant: "destructive" });
      return;
    }

    await axios.get(`http://localhost:5000/api/request/approve/${id}`)
      .then(_res => {
        toast({ description: "request approved" });
        fetchData();
      })
      .catch(_err => {
        console.log(_err);
        toast({ description: "error in approving the request", variant: "destructive" });
      })
  };

  const handleReject = async (id: string) => {
    if (id === null || id === "") {
      toast({ description: "no request with this id", variant: "destructive" });
      return;
    }

    await axios.get(`http://localhost:5000/api/request/reject/${id}`)
      .then(_res => {
        toast({ description: "request rejected" });
        fetchData();
      })
      .catch(_err => {
        console.log(_err);
        toast({ description: "error in rejecting the request", variant: "destructive" });
      })
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full bg-blue-100">
      <Table>
        <TableHeader>
          <TableRow className="font-semibold">
            <TableCell>Customer Name</TableCell>
            <TableCell>Customer Contact</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Vechicle Name</TableCell>
            <TableCell>Vechicle Number</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            data.map((request) => {
              return (
                <TableRow>
                  <TableCell>{request?.userName}</TableCell>
                  <TableCell>{request?.userContact}</TableCell>
                  <TableCell>{request?.address}</TableCell>
                  <TableCell>{request?.vehicleNumber}</TableCell>
                  <TableCell>{request?.vehicleModal}</TableCell>
                  <TableCell>{request?.date}</TableCell>
                  <TableCell>{request?.duration} days</TableCell>
                  {request?.approved === "Pending" ? (
                    <TableCell className="flex gap-1">
                      <Button onClick={() => handleApprove(request?._id)} className="bg-green-400 hover:bg-white hover:text-green-400 border-green-400 border-1">
                        <TiTick />
                      </Button>
                      <Button
                        onClick={() => handleReject(request?._id)}
                        className="hover:bg-white hover:text-red-500"
                        variant={"destructive"}
                      >
                        <RxCross2 />
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell className={request?.approved === "approved" ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>{request?.approved}</TableCell>
                  )}
                </TableRow>
              );
            })
          ) : (
            <div>Data not available</div>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default View;
