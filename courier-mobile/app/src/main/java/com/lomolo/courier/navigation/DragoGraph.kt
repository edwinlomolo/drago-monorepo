package com.lomolo.courier.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.lomolo.courier.MainViewModel
import com.lomolo.courier.compose.screens.home.HomeScreen
import com.lomolo.courier.compose.screens.home.HomeScreenRoute
import com.lomolo.courier.viewmodels.DragoViewModelProviders

interface Navigation {
    // Path
    val route: String
    // Title
    val title: Int?
}

@Composable
fun DragoNavHost(
    navHostController: NavHostController,
    mainViewModel: MainViewModel = viewModel(factory = DragoViewModelProviders.Factory),
) {
    val deviceDetails by mainViewModel.deviceDetailsUiState.collectAsState()

    NavHost(
        navController = navHostController,
        startDestination = HomeScreenRoute.route
    ) {
        composable(route = HomeScreenRoute.route) {
            Scaffold {innerPadding ->
                Surface(
                    modifier = Modifier
                        .padding(innerPadding)
                ) {
                    HomeScreen(
                        deviceGps = deviceDetails.gps,
                        onMaploaded = { mainViewModel.setMaploaded(it) },
                        mapLoaded = deviceDetails.mapLoaded,
                    )
                }
            }
        }
    }
}