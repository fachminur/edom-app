'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Chart } from 'primereact/chart';
import { Menu } from 'primereact/menu';
import { ProductService } from './service/ProductService';

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: 0.4,
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: 0.4,
    },
  ],
};

const dashboard = () => {
  const [products, setProducts] = useState([]);
  const [lineOptions, setLineOptions] = useState(null);
  const menu1 = useRef(null);
  const menu2 = useRef(null);

  const applyLightTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  useEffect(() => {
    ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
        alt={product.image}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const priceBodyTemplate = (product) => {
    return formatCurrency(product.price);
  };

  const ratingBodyTemplate = (product) => {
    return <Rating value={product.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (product) => {
    return (
      <Tag
        value={product.inventoryStatus}
        severity={getSeverity(product)}
      ></Tag>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-xl text-900 font-bold">Products</span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );
  const footer = `In total there are ${
    products ? products.length : 0
  } products.`;

  return (
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

      <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-5 mb-8">
        <Card className="mb-0 ">
          <div className="flex justify-between">
            <div>
              <span className="block text-500 font-semibold mb-3">Orders</span>
              <div className="text-900 font-medium text-xl">152</div>
            </div>
            <div className="flex p-4 rounded-xl bg-blue-100 items-center">
              <i
                className="pi pi-shopping-cart text-blue-500"
                style={{ fontSize: '2.5rem' }}
              />
            </div>
          </div>
          <span className="text-green-500 font-medium">24 new </span>
          <span className="text-500">since last visit</span>
        </Card>
        <Card className="mb-0 col-12 lg:col-6 xl:col-3">
          <div className="flex justify-between">
            <div>
              <span className="block text-500 font-semibold mb-3">Orders</span>
              <div className="text-900 font-medium text-xl">152</div>
            </div>
            <div className="flex p-4 rounded-xl bg-orange-100 items-center">
              <i
                className="pi pi-map-marker text-orange-500"
                style={{ fontSize: '2.5rem' }}
              />
            </div>
          </div>
          <span className="text-green-500 font-medium">24 new </span>
          <span className="text-500">since last visit</span>
        </Card>
        <Card className="mb-0 col-12 lg:col-6 xl:col-3">
          <div className="flex justify-between">
            <div>
              <span className="block text-500 font-semibold mb-3">Orders</span>
              <div className="text-900 font-medium text-xl">152</div>
            </div>
            <div className="flex p-4 rounded-xl bg-cyan-100 items-center">
              <i
                className="pi pi-inbox text-cyan-500"
                style={{ fontSize: '2.5rem' }}
              />
            </div>
          </div>
          <span className="text-green-500 font-medium">24 new </span>
          <span className="text-500">since last visit</span>
        </Card>
        <Card className="mb-0 col-12 lg:col-6 xl:col-3">
          <div className="flex justify-between">
            <div>
              <span className="block text-500 font-semibold mb-3">Orders</span>
              <div className="text-900 font-medium text-xl">152</div>
            </div>
            <div className="flex p-4 rounded-xl bg-purple-100 items-center">
              <i
                className="pi pi-comment text-purple-500"
                style={{ fontSize: '2.5rem' }}
              />
            </div>
          </div>
          <span className="text-green-500 font-medium">24 new </span>
          <span className="text-500">since last visit</span>
        </Card>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full xl:w-1/2 p-2">
          <Card title="Recent Update" className="mb-8">
            <DataTable
              value={products}
              header={header}
              footer={footer}
              tableStyle={{ minWidth: '60rem' }}
            >
              <Column field="name" header="Name"></Column>
              <Column header="Image" body={imageBodyTemplate}></Column>
              <Column
                field="price"
                header="Price"
                body={priceBodyTemplate}
              ></Column>
              <Column field="category" header="Category"></Column>
              <Column
                field="rating"
                header="Reviews"
                body={ratingBodyTemplate}
              ></Column>
              <Column header="Status" body={statusBodyTemplate}></Column>
            </DataTable>
          </Card>
          <div className="card">
            <div className="flex justify-between items-center mb-5">
              <p className="text-xl text-900 font-bold">
                Best Selling Products
              </p>
              <div>
                <Button
                  type="button"
                  icon="pi pi-ellipsis-v"
                  className="p-button-rounded p-button-text p-button-plain"
                  onClick={(event) => menu1.current.toggle(event)}
                />
                <Menu
                  ref={menu1}
                  popup
                  model={[
                    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                    { label: 'Remove', icon: 'pi pi-fw pi-minus' },
                  ]}
                />
              </div>
            </div>
            <ul className="list-none p-0 m-0">
              <li className="flex flex-column md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <span className="text-900 font-semibold mr-2 mb-1 md:mb-0">
                    Portal Sticker
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex items-center">
                  <div
                    className="bg-gray-200 rounded-full overflow-hidden w-[10rem] xs:w-[6rem]"
                    style={{ height: '8px' }}
                  >
                    <div
                      className="bg-cyan-500 h-full"
                      style={{ width: '36%' }}
                    />
                  </div>
                  <span className="text-cyan-500 ml-3 font-medium">%16</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <span className="text-900 font-semibold mr-2 mb-1 md:mb-0">
                    Supernova Sticker
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex items-center">
                  <div
                    className="bg-gray-200 rounded-full overflow-hidden w-[10rem] xs:w-[6rem]"
                    style={{ height: '8px' }}
                  >
                    <div
                      className="bg-pink-500 h-full"
                      style={{ width: '67%' }}
                    />
                  </div>
                  <span className="text-pink-500 ml-3 font-medium">%67</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <span className="text-900 font-semibold mr-2 mb-1 md:mb-0">
                    Wonders Notebook
                  </span>
                  <div className="mt-1 text-600">Office</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex items-center">
                  <div
                    className="bg-gray-200 rounded-full overflow-hidden w-[10rem] xs:w-[6rem]"
                    style={{ height: '8px' }}
                  >
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: '35%' }}
                    />
                  </div>
                  <span className="text-green-500 ml-3 font-medium">%35</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <span className="text-900 font-semibold mr-2 mb-1 md:mb-0">
                    Mat Black Case
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex items-center">
                  <div
                    className="bg-gray-200 rounded-full overflow-hidden w-[10rem] xs:w-[6rem]"
                    style={{ height: '8px' }}
                  >
                    <div
                      className="bg-purple-500 h-full"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <span className="text-purple-500 ml-3 font-medium">%75</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <span className="text-900 font-semibold mr-2 mb-1 md:mb-0">
                    Robots T-Shirt
                  </span>
                  <div className="mt-1 text-600">Clothing</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex items-center">
                  <div
                    className="bg-gray-200 rounded-full overflow-hidden w-[10rem] xs:w-[6rem]"
                    style={{ height: '8px' }}
                  >
                    <div
                      className="bg-teal-500 h-full"
                      style={{ width: '40%' }}
                    />
                  </div>
                  <span className="text-teal-500 ml-3 font-medium">%40</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full xl:w-1/2 p-2">
          <Card title="Sales">
            <Chart type="line" data={lineData} options={lineOptions} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default dashboard;
