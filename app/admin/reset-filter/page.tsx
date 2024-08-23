'use client';


import React, { FC, useState } from "react";
import MainLayout from "@/app/admin/components/Admin/MainLayout";
import { Card, CardBody, CardHeader } from "@/app/ui/Card";



const Page: React.FC = () => {
  return (
    <React.Fragment>
    <MainLayout>
      <div className="m-4">
        <Card className="my-4">
          <CardHeader>Reset page</CardHeader>
        </Card>
      </div>
    </MainLayout>
  </React.Fragment>
  );
};

export default Page;


