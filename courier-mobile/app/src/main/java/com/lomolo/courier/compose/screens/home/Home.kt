package com.lomolo.courier.compose.screens.home

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.maps.android.compose.GoogleMap
import com.google.maps.android.compose.MapProperties
import com.google.maps.android.compose.MapUiSettings
import com.google.maps.android.compose.rememberCameraPositionState
import com.lomolo.courier.DeviceDetails
import com.lomolo.courier.navigation.Navigation

object HomeScreenRoute: Navigation {
    override val route = "home"
    override val title = null
}

@Composable
fun HomeScreen(
    modifier: Modifier = Modifier,
    deviceGps: LatLng,
) {
    val uiSettings by remember {
        mutableStateOf(MapUiSettings(
            zoomControlsEnabled = false
        ))
    }
    val mapProperties by remember {
        mutableStateOf(MapProperties())
    }
    val cameraPositionState = rememberCameraPositionState {
        position = CameraPosition(deviceGps, 16f, 0f, 0f)
    }

    GoogleMap(
        modifier = modifier.fillMaxSize(),
        uiSettings = uiSettings,
        properties = mapProperties,
        cameraPositionState = cameraPositionState,
    )
}