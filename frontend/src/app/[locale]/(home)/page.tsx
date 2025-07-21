"use client";

import "./page.scss";

import { TableProvider } from "./Dashboard/context/table/TableProvider";
import { UserModalProvider } from "./Dashboard/context/userModal/UserModalProvider";
import { DashboardHeading } from "./Dashboard/DashboardHeading";
import { DashboardPagination } from "./Dashboard/DashboardPagination";
import { DashboardTable } from "./Dashboard/DashboardTable";
import { DashboardUserModal } from "./Dashboard/DashboardUserModal";

export default function Home() {
    return (
        <main className="Main-home">
            <TableProvider>
                <div>
                    <UserModalProvider>
                        <DashboardUserModal />
                        <DashboardHeading />
                        <DashboardTable />
                    </UserModalProvider>
                    <DashboardPagination />
                </div>
            </TableProvider>
        </main>
    );
}
