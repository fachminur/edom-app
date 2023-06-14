import { NextResponse, NextRequest } from 'next/server'
import { axiosClient } from '@/service/axios';
import { headers } from 'next/headers'
 
export async function GET(request) {
  const headersList = headers()
  const authorization = headersList.get('authorization')
  if (!authorization) {
    return NextResponse.json({"message": "Unauthorize"}, {status: 401})
  }
  const config = { 
    headers: {
      'Authorization': authorization
    },
  }; 
  try {
    const {data} = await axiosClient.get('/wilayah/provinsi', config)
    return NextResponse.json(data)
  } catch (error) {
    const {data, status} = error.response
    return NextResponse.json(data, {status: status})
  }
}