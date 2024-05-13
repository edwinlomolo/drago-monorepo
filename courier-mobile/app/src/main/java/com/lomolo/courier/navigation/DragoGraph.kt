package com.lomolo.courier.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.lomolo.courier.compose.screens.home.HomeScreen
import com.lomolo.courier.compose.screens.home.HomeScreenRoute

interface Navigation {
    // Path
    val route: String
    // Title
    val title: Int?
}

@Composable
fun DragoNavHost(
    navHostController: NavHostController
) {
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
                    HomeScreen()
                }
            }
        }
    }
}