package com.lomolo.courier

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import com.lomolo.courier.navigation.DragoNavHost

@Composable
fun DragoApplication(navHostController: NavHostController) {
    DragoNavHost(navHostController = navHostController)
}