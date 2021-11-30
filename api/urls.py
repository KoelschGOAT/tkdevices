from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('devices', DeviceView.as_view()),
    path('device', devices),
    path("device/<str:serialnumber>",device_detail, name="device_detail"),
    path('devices/defect', device_defect),
    path('devices/defect/<int:serialnumber>', defect_device_detail),
    #path('api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('current_user',user),
    path('handouts/<int:pk>',handout_details),
    path('handouts',handout),
    path('files',file_provider),
    path('file', file_provider_view),
    path("permissions",permissions),
]
urlpatterns = format_suffix_patterns(urlpatterns)
