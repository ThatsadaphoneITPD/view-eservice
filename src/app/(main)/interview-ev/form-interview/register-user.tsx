'use client';
import Table, { HeaderCell } from '@/components/ui/table';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { Avatar, Text } from "rizzui";
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
    charger_tou_peak_off: string;
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
}
interface FormattedDataItem {
    id: number;
    user: Userinfo;
    car: Evcar;
    address: Address;
    gps: Location;
    agree: Interest;
}

const envapi = process.env.NEXT_PUBLIC_API_BACKEND;
const apiHttp = axios.create({ baseURL: envapi, headers: { "Content-type": "application/json", 'Content-Disposition': 'attachment; filename*=UTF-8\'\'', }, });
const formateStuctrue = (data: any): FormattedDataItem[] => {
    const formattedData: FormattedDataItem[] = data?.map((item: any, index: number) => ({
        id: index + 1,
        user: {
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
            charger_tou_peak_off: item.charger_tou_peak_off,
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
        },
    }));
    // console.log(formattedData)
    return formattedData;
}

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
                    <div className="ml-3 rtl:ml-0 rtl:mr-3">
                        <Text className="mb-0.5 !text-sm font-medium">
                            {user?.first_name}
                        </Text>
                        <Text className="text-xs text-gray-400">
                            {user?.last_name}
                        </Text>
                        <Text className="text-xs text-gray-400">
                            {user?.meter_account}
                        </Text>
                    </div>
                </div>
            ),
        },
        {
            title: <HeaderCell title="EV Car" />,
            dataIndex: "car",
            key: "car",
            width: 320,
            render: (car: any) => (
                <div>
                    <Text className="mb-0.5 !text-sm font-medium">
                        {car?.car_banner}
                    </Text>
                    <Text as="p" className="text-xs text-gray-400">
                        {car?.car_model}
                    </Text>
                </div>
            ),
        },
        {
            title: <></>,
            dataIndex: "action",
            key: "action",
            width: 120,
            render: (_: string, row: any) => (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="text-primary underline"
                        onClick={() => alert(`Edit item #${row.id}`)}
                    >
                        Edit
                    </button>
                    <button type="button" className="underline">
                        View
                    </button>
                </div>
            ),
        },
    ];
const apiauth = async () => {
    const userlogin = { "username": "ev-edl-service", "password": "%EvService@2024$" };
    try {
        const response = await apiHttp.post("/api_v1/auth/login", userlogin);
        return response.data as any
    } catch (error: any) {
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
        const response = await apiHttp.get("/api_v1/evRegister/get", config);
        return response.data as any
    } catch (error: any) {
        return error.message as any
    }

}
export const RegisterEVList = (props: Props) => {
    const [order, setOrder] = React.useState<string>("desc");
    const [column, setColumn] = React.useState<string>("");
    const [data, setData] = React.useState<any>();
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await apiauth();
                const getEVuser = await apigetdata(responseData.data.access_token)
                const formattedData: FormattedDataItem[] = formateStuctrue(getEVuser.data);
                toast.success('ສຳເລັດເອົາຂໍ້ມູນ!')
                setData(formattedData)
            } catch (error: any) {
                toast.error('ບໍ່ສຳເລັດ!')
                console.error("Error fetching data:", error);
            }
        };
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
    const columns: any = React.useMemo(
        () => getColumns(order, column, onHeaderClick),
        [order, column, onHeaderClick]
    );

    return <Table data={data} columns={columns} className="text-sm" />;
}