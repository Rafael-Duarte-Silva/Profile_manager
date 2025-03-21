"use client";

import "./page.scss";

import { TableProvider } from "@/app/[locale]/context/TableContext";

import { Heading } from "./components/Heading";
import { Pagination } from "./components/Pagination";
import { Table } from "./components/Table";
import { UserModal } from "./components/UserModal";

import { UserModalProvider } from "./context/UserModalContext";

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

