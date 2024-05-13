package com.lomolo.courier.container

import android.content.Context

interface IAppContainer {}

class DefaultContainer(private val context: Context): IAppContainer {}