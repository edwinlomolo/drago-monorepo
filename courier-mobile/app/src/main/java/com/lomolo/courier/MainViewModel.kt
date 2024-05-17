package com.lomolo.courier

import androidx.lifecycle.ViewModel
import com.google.android.gms.maps.model.LatLng
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class MainViewModel: ViewModel() {
    private val _deviceDetails: MutableStateFlow<DeviceDetails> = MutableStateFlow(DeviceDetails())
    val deviceDetailsUiState = _deviceDetails.asStateFlow()

    fun setDeviceLocation(gps: LatLng) {
        _deviceDetails.update {
            it.copy(gps = gps)
        }
    }

    fun setMaploaded(v: Boolean) {
        _deviceDetails.update {
            it.copy(mapLoaded = v)
        }
    }
}

data class DeviceDetails(
    val gps: LatLng = LatLng(0.0, 0.0),
    val mapLoaded: Boolean = false,
)