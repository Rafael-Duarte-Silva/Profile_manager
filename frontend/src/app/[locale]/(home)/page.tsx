"use client";

import "./page.scss";

import { Heading } from "./components/Heading";
import { Pagination } from "./components/Pagination";
import { Table } from "./components/Table";
import { UserModal } from "./components/UserModal";

import { TableProvider } from "./context/table/TableProvider";
import { UserModalProvider } from "./context/userModal/UserModalProvider";

export default function Home() {
    return (
        <main className="Main-home">
            <TableProvider>
                <UserModalProvider>
                    <UserModal />
                    <Heading />
                    <Table />
                </UserModalProvider>
                <Pagination />
            </TableProvider>
        </main>
    );
}
