package com.lomolo.courier

import android.app.Application
import com.lomolo.courier.container.DefaultContainer
import com.lomolo.courier.container.IAppContainer

class DragoApp: Application() {
    lateinit var container: IAppContainer

    override fun onCreate() {
        super.onCreate()
        container = DefaultContainer(this)
    }
}