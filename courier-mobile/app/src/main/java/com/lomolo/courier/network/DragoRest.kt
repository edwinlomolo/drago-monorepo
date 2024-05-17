package com.lomolo.courier.network

import com.lomolo.courier.model.CourierSignin
import com.lomolo.courier.model.Session
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

interface IDragoRest {
    @Headers("Content-Type: application/json")
    @POST("api/courier/signin")
    suspend fun courierSignIn(@Body input: CourierSignin): Session
}