from django.urls import path
from .views import StockListCreateView, AlertListCreateView, UserStocksView

urlpatterns = [
    path('stocks/', StockListCreateView.as_view(), name='stocks-list-create'),
    path('alerts/', AlertListCreateView.as_view(), name='alerts-list-create'),
    path('user-stocks/', UserStocksView.as_view(), name='user-stocks'),
]
