package com.lomolo.courier.viewmodels

import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.CreationExtras
import com.lomolo.courier.DragoApp

/* Drago view model root provider */
object DragoViewModelProviders {
}

/* Instance of drago app */
fun CreationExtras.dragoApplication(): DragoApp = (this[ViewModelProvider.AndroidViewModelFactory.APPLICATION_KEY] as DragoApp)