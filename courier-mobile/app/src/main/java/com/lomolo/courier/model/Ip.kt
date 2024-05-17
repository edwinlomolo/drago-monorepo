package com.lomolo.courier.model

import com.squareup.moshi.Json

data class Ip(
    @Json(name = "loc") val location: String,
)