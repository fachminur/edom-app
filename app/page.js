'use client';
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/service/axios';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
        

export default function Home() {
  const { data: session } = useSession()
  console.log(session);
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const { data, isLoading, isFetching} = useQuery(
    ["ListWilayah"],
    () => axios.get("/api/wilayah"),
    {
      select: (response) => response.data,
      staleTime: 1000 * 60 * 60, // Datanya Fresh jadi 1 Jam
      enabled: session?.user?.staraToken !== undefined
    }
  )
  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
    }
  }, [session])

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  
  return (
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Home</p>

      <div className="grid lg:grid-cols-1 gap-1 mb-16">
        <DataTable value={data?.data} 
          paginator rows={5} 
          rowsPerPageOptions={[5, 10, 25, 50]} 
          tableStyle={{ minWidth: '50rem' }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" 
          paginatorLeft={paginatorLeft} 
          paginatorRight={paginatorRight}
        >
          <Column field="prov_id" header="Code"></Column>
          <Column field="nama" header="Name"></Column>
        </DataTable>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm mb-5"></div>
      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm mb-5"></div>
      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm mb-5"></div>
      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm"></div>
    </>
  );
}
