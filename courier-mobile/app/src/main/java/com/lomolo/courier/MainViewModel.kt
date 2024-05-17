package com.lomolo.courier

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.android.gms.maps.model.LatLng
import com.lomolo.courier.network.IDragoRest
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import okio.IOException

class MainViewModel(
    private val dragoRestApiService: IDragoRest
): ViewModel() {
    private val _deviceDetails: MutableStateFlow<DeviceDetails> = MutableStateFlow(DeviceDetails())
    val deviceDetailsUiState = _deviceDetails.asStateFlow()
    var gettingDeviceDetailsState: GettingDeviceDetailsState by mutableStateOf(GettingDeviceDetailsState.Loading)

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

    private fun getIpinfo() {
        viewModelScope.launch {
            gettingDeviceDetailsState = GettingDeviceDetailsState.Loading
            try {
                val res = dragoRestApiService.ip()
                val coords = res.location.split(",")
                _deviceDetails.update {
                    it.copy(
                        gps = LatLng(coords[0].toDouble(), coords[1].toDouble())
                    )
                }
            } catch(e: IOException) {
                gettingDeviceDetailsState = GettingDeviceDetailsState.Error(e.message)
                e.printStackTrace()
            }
        }
    }

    init {
        getIpinfo()
    }
}

data class DeviceDetails(
    val gps: LatLng = LatLng(0.0, 0.0),
    val mapLoaded: Boolean = false,
)

interface GettingDeviceDetailsState {
    data object Loading: GettingDeviceDetailsState
    data object Success: GettingDeviceDetailsState
    data class Error(val message: String?): GettingDeviceDetailsState
}