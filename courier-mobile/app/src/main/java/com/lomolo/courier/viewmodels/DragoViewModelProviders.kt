package com.lomolo.courier.viewmodels

import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.CreationExtras
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.lomolo.courier.DragoApp
import com.lomolo.courier.MainViewModel

/* Drago view model root provider */
object DragoViewModelProviders {
    val Factory = viewModelFactory {
        lateinit var mainViewModel: MainViewModel

        initializer {
            mainViewModel = MainViewModel(dragoApplication().container.dragoRestApiService)
            mainViewModel
        }
    }
}

/* Instance of drago app */
fun CreationExtras.dragoApplication(): DragoApp = (this[ViewModelProvider.AndroidViewModelFactory.APPLICATION_KEY] as DragoApp)