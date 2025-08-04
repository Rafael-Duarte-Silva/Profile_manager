"use client";

import { CheckboxProvider } from "./context/checkbox/CheckboxProvider";
import { FiltersProvider } from "./context/filters/FiltersProvider";
import { UserModalProvider } from "./context/userModal/UserModalProvider";
import { DashboardHeading } from "./DashboardHeading";
import { DashboardPagination } from "./DashboardPagination";
import { DashboardTable } from "./DashboardTable";
import { DashboardUserModal } from "./DashboardUserModal";

export const DashBoard = () => {
    return (
        <div>
            <FiltersProvider>
                <UserModalProvider>
                    <DashboardUserModal />
                    <CheckboxProvider>
                        <DashboardHeading />
                        <DashboardTable />
                    </CheckboxProvider>
                </UserModalProvider>
                <DashboardPagination />
            </FiltersProvider>
        </div>
    );
};

