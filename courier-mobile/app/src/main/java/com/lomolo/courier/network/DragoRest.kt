package com.lomolo.courier.network

import com.lomolo.courier.model.Ipinfo

interface IDragoRest {
    suspend fun getIpinfo(): Ipinfo
}