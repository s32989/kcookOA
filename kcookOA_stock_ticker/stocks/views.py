from rest_framework import generics
from .models import Stock, Alert
from .serializers import StockSerializer, AlertSerializer

class StockListCreateView(generics.ListCreateAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

class AlertListCreateView(generics.ListCreateAPIView):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer

class UserStocksView(generics.ListAPIView):
    serializer_class = StockSerializer

    def get_queryset(self):
        user = self.request.query_params.get('user')
        return Stock.objects.filter(user=user)
