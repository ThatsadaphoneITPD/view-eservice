'use client';
import Table, { HeaderCell } from '@/components/ui/table';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { Avatar, Button, Text } from "rizzui";
import GoogleMapShow from './displaymap';
interface Props {

}

interface Evcar {
    car_banner: string;
    car_battery: number;
    car_model: string;
    car_port: string;
    type_charger: string;
    charger_banner: string;
    charger_power: number;

}
interface Userinfo {
    first_name: string;
    last_name: string;
    meter_account: number;
    phone_number: string;
}
interface Address {
    village: string;
    city: string;
    province: string;
}
interface Location {
    latitude: string;
    longitude: string;
}
interface Interest {
    electic_bill_policy: string;
    install_cost: string;
    intrest_install: string;
    reason_install: string;
    charger_tou_peak_off: string;
}
interface FormattedDataItem {
    id: number;
    user: Userinfo;
    car: Evcar;
    address: Address;
    gps: Location;
    agree: Interest;
}
interface FormattedExport {
    id: number;
    first_name: string,
    last_name: string,
    meter_account: string,
    phone_number: string,
    car_banner: string,
    car_battery: string,
    car_model: string,
    car_port: string,
    type_charger: string,
    charger_banner: string,
    charger_power: string,
    village: string,
    city: string,
    province: string,
    latitude: string,
    longitude: string,
    electic_bill_policy: string,
    install_cost: string,
    intrest_install: string,
    reason_install: string,
    charger_tou_peak_off: string,
}


const envapi = process.env.NEXT_PUBLIC_API_BACKEND;
const apiHttp = axios.create({ baseURL: envapi, headers: { "Content-type": "application/json", 'Content-Disposition': 'attachment; filename*=UTF-8\'\'', }, });
const formateStuctrue = (data: any): FormattedDataItem[] => {
    const formattedData: FormattedDataItem[] = data?.map((item: any, index: number) => ({
        id: index + 1,
        code_id: item.id,
        user: {
            avatar: index + 1,
            first_name: item.first_name,
            last_name: item.last_name,
            meter_account: item.meter_account,
            phone_number: item.phone_number,
        },
        car: {
            car_banner: item.car_banner,
            car_battery: item.car_battery,
            car_model: item.car_model,
            car_port: item.car_port,
            type_charger: item.type_charger,
            charger_banner: item.car_banner,
            charger_power: item.charger_power,
        },
        address: {
            village: item.village,
            city: item.city,
            province: item.province,
        },
        gps: {
            latitude: item.latitude,
            longitude: item.longitude,
        },
        agree: {
            electic_bill_policy: item.electic_bill_policy,
            install_cost: item.install_cost,
            intrest_install: item.intrest_install,
            reason_install: item.intrest_install,
            charger_tou_peak_off: item.charger_tou_peak_off,
        },
    }));
    // console.log(formattedData)
    return formattedData;
}
const formateExcel = (data: any): FormattedExport[] => {
    const formattedData: FormattedExport[] = data?.map((item: any, index: number) => ({
        id: index + 1,
        first_name: item.first_name,
        last_name: item.last_name,
        meter_account: item.meter_account,
        phone_number: item.phone_number,
        car_banner: item.car_banner,
        car_battery: item.car_battery,
        car_model: item.car_model,
        car_port: item.car_port,
        type_charger: item.type_charger,
        charger_banner: item.car_banner,
        charger_power: item.charger_power,
        village: item.village,
        city: item.city,
        province: item.province,
        latitude: item.latitude,
        longitude: item.longitude,
        install_cost: item.install_cost,
        charger_tou_peak_off: item.charger_tou_peak_off,
        intrest_install: item.intrest_install,
    }));
    return formattedData;
}
const apiauth = async () => {
    const userlogin = { "username": "ev-edl-service", "password": "%EvService@2024$" };
    try {
        const response = await apiHttp.post("/api_v1/evregister-svc/auth/login", userlogin);
        return response.data as any
    } catch (error: any) {
        console.log(error.message)
        return error.message as any
    }
}
const apigetdata = async (auth: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${auth}`,
        },
    };
    try {
        const response = await apiHttp.get("/api_v1/evregister-svc/evRegister/get", config);
        return response.data as any
    } catch (error: any) {
        return error.message as any
    }
}
const exportToExcel = async () => {
    const responseData = await apiauth();
    const getEVuser = await apigetdata(responseData.data.access_token)
    const getCleanData = formateExcel(getEVuser.data)
    const dataArray = getCleanData.map((item: any) => Object.values(item));
    const columns = Object.keys(getCleanData[0]);
    dataArray.unshift(columns);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `EVCarUser.xlsx`);
};

export const RegisterEVList = (props: Props) => {
    const [order, setOrder] = React.useState<string>("desc");
    const [column, setColumn] = React.useState<string>("");
    const [data, setData] = React.useState<any>();
    const fetchData = async () => {
        try {
            const responseData = await apiauth();
            const getEVuser = await apigetdata(responseData.data.access_token)
            // console.log(getEVuser.data)
            const formattedData: FormattedDataItem[] = formateStuctrue(getEVuser.data);
            toast.success('ສຳເລັດເອົາຂໍ້ມູນ!')
            setData(formattedData)
        } catch (error: any) {
            toast.error('ບໍ່ສຳເລັດ!' + error.message)
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);
    const onHeaderClick = (value: string) => ({
        onClick: () => {
            setColumn(value);
            setOrder(order === "desc" ? "asc" : "desc");
            if (order === "desc") {
                // @ts-ignore
                setData([...data.sort((a, b) => (a[value] > b[value] ? -1 : 1))]);
            } else {
                // @ts-ignore
                setData([...data.sort((a, b) => (a[value] > b[value] ? 1 : -1))]);
            }
        },
    });
    const getColumns = (
        order: string,
        column: string,
        onHeaderClick: (value: string) => any
    ) => [
            {
                title: (
                    <HeaderCell
                        title="Id"
                        sortable
                        ascending={order === "asc" && column === "id"}
                    />
                ),
                onHeaderCell: () => onHeaderClick("id"),
                dataIndex: "id",
                key: "id",
                width: 50,
            },
            {
                title: <HeaderCell title="EV User" />,
                dataIndex: "user",
                key: "user",
                width: 250,
                render: (user: any) => (
                    <div className="flex items-center">
                        <Avatar name="John Doe" src={`https://randomuser.me/api/portraits/men/${user?.avatar}.jpg`} />
                        <div className="ml-3 rtl:ml-0 rtl:mr-3">
                            <Text className="mb-0.5 !text-sm font-medium">
                                {user?.first_name + " " + user?.last_name}
                            </Text>
                            <Text className="text-xs text-gray-400">
                                {user?.meter_account}
                            </Text>
                            <Text className="text-xs text-gray-400">
                                {user?.phone_number}
                            </Text>
                        </div>
                    </div>
                ),
            },
            {
                title: <HeaderCell title="EV Car" />,
                dataIndex: "car",
                key: "car",
                width: 150,
                render: (car: any) => (
                    <div>
                        <Text className="mb-0.5 !text-sm font-medium">
                            {car?.car_model + "." + car?.car_banner + ", " + car?.car_battery + " kWh"}
                        </Text>
                        <Text as="p" className="text-xs text-gray-400">
                            {"ຫົວ " + car?.car_port + ", " + car?.charger_banner + " " + car?.type_charger}
                        </Text>
                    </div>
                ),
            },

            {
                title: <HeaderCell title="ຄວາມຕ້ອງການ" />,
                dataIndex: "agree",
                key: "agree",
                width: 150,
                render: (agree: any) => (
                    <div>
                        <Text className="mb-0.5 !text-sm font-medium">
                            {agree?.charger_tou_peak_off + ", " + agree?.install_cost}
                        </Text>
                        <Text className="mb-0.5 !text-sm font-medium">
                            {agree?.intrest_install}
                        </Text>
                    </div>
                ),
            },
            {
                title: <HeaderCell title="ທີ່ຢູ່" />,
                dataIndex: "address",
                key: "address",
                width: 150,
                render: (address: any) => (
                    <div>
                        <Text className="mb-0.5 !text-sm font-medium">
                            {address?.village + ", " + address?.city}
                        </Text>
                        <Text className="mb-0.5 !text-sm font-medium">
                            {address?.province}
                        </Text>
                    </div>
                ),
            },
            {
                title: <HeaderCell title="ພິກັດ" />,
                dataIndex: "gps",
                key: "gps",
                width: 150,
                render: (gps: any) => (
                    <GoogleMapShow lat={gps?.latitude} lng={gps?.longitude} />
                    // <Text > {gps ? `${gps.latitude}, ${gps.longitude}` : 'No GPS data available'}</Text>
                )
            },
            // {
            //     title: <></>,
            //     dataIndex: "action",
            //     key: "action",
            //     width: 50,
            //     render: (_: string, row: any) => (
            //         <div className="flex items-center gap-2">
            //             <MdDelete
            //                 style={{ color: "#d24141", }}
            //                 size={30}
            //                 onClick={() => apidelete(row?.code_id, fetchData())}
            //             >
            //                 Edit
            //             </MdDelete>
            //         </div>
            //     ),
            // },
        ];

    const columns: any = React.useMemo(
        () => getColumns(order, column, onHeaderClick),
        [order, column, onHeaderClick]
    );

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end my-5'>
                <Button style={{ backgroundColor: "#2e33a9" }} onClick={() => exportToExcel()}>ດາວໂຫຼດ Excel</Button>
            </div>
            <Table data={data} columns={columns} className="text-sm h-full" />
        </div>
    );
}