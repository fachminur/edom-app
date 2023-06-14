import { NextResponse, NextRequest } from 'next/server'
import { axiosClient } from '@/service/axios'
 
export async function POST(request) {
  const req = await request.json()
  // console.log('request', req);
  try {
    const {data} = await axiosClient.post('/auth/login', req)
    return NextResponse.json(data)
    
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data);
    const {data, status} = error.response
    if (error?.response?.status === 400) {
      return NextResponse.json(data, {status: status})
    }else if (error?.response?.status === 422) {
      const {data} = error.response
      return NextResponse.json(data, {status: status})
    }else{
      return NextResponse.json({"message": 'Oops Something Wrong'}, {status: 500})
    }
  }
}