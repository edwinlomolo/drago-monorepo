package com.lomolo.courier.compose.screens.home

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.lomolo.courier.navigation.Navigation

object HomeScreenRoute: Navigation {
    override val route = "home"
    override val title = null
}

@Composable
fun HomeScreen(
    modifier: Modifier = Modifier
) {
    Text(text = "Welcome")
}