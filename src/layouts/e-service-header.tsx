'use client';
import { IoIosArrowBack } from "react-icons/io";
import React from 'react'
import Link from 'next/link';
import { ActionIcon } from '@/components/ui/action-icon';
import cn from '@/utils/class-names';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import { usePathname } from "next/navigation";

function HeaderMenuRight() {
    return (
        <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">

        </div>
    );
}

interface Props {

}

export const EServiceHeader = (props: Props) => {
    const isMounted = useIsMounted();
    const windowScroll = useWindowScroll();



    const pathname = usePathname();
    return (
        <header
            style={{ backgroundColor: "#2e33a9" }}
            className={cn(
                'sticky top-0 z-50 flex flex-row items-center bg-gray-0/80 px-4 py-2 backdrop-blur-xl h-14 md:px-5 lg:px-6 2xl:py-2 3xl:px-8 4xl:px-10',
                ((isMounted && windowScroll.y) as number) > 2 ? 'card-shadow' : '',
                pathname === "/" ? "opacity-0" : ""
            )}
        >
            <div className="flex-none items-center">
                {pathname === "/interview-ev" ?
                    <Link href='./' >
                        <ActionIcon aria-label="Open Sidebar Menu" variant="text" className={cn(`me-3 h-auto w-auto p-0 sm:me-4  h-12 md:h-14 `)} >
                            <IoIosArrowBack style={{ color: "white" }} className=" text-[1.5rem] md:text-[1.5rem]" />
                        </ActionIcon>
                    </Link>
                    :
                    <>
                    </>
                }
            </div>
            <div className={`flex-1 h-12 md:h-14 flex items-center justify-center ${pathname === "/interview-ev" ? "" : "hidden"}`}>
                <h3 className="text-white text-[16px] md:text-4x1">ຕາຕະລາງຕິດຕາຜູ້ນຳໃຊ້ ລົດ EV</h3>
            </div>
            <div className="flex-none">
                <HeaderMenuRight />
            </div>
        </header>
    )
}
