"use client";

import { TableProvider } from "./context/table/TableProvider";
import { UserModalProvider } from "./context/userModal/UserModalProvider";
import { DashboardHeading } from "./DashboardHeading";
import { DashboardPagination } from "./DashboardPagination";
import { DashboardTable } from "./DashboardTable";
import { DashboardUserModal } from "./DashboardUserModal";

export const DashBoard = () => {
    return (
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
    );
};

