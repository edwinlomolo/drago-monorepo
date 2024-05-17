package com.lomolo.courier.network

import com.lomolo.courier.model.Ip
import retrofit2.http.Headers
import retrofit2.http.GET

interface IDragoRest {
    @Headers("Content-Type: application/json")
    @GET("api/ip")
    suspend fun ip(): Ip
}