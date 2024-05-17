package com.lomolo.courier

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.lomolo.courier.navigation.DragoNavHost
import com.lomolo.courier.ui.theme.DCTheme

@Composable
fun DragoApplication(navHostController: NavHostController) {
    DragoNavHost(navHostController = navHostController)
}

@Preview
@Composable
fun DragoAppPreview() {
    DCTheme {
        DragoApplication(rememberNavController())
    }
}