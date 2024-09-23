from django.urls import path
from .views import admin_login, login_page,accounts, admin_logout,dashboard, au2TulburDashboard, createAccount

urlpatterns= [
    path('login', login_page, name='login_page'),
    path('doLogin', admin_login, name='do_login'),
    path('admin_logout', admin_logout, name='admin_logout'),
    path('accounts', accounts, name='accounts'),
    path('dashboard', dashboard, name='dashboard'),
    path('au2/tulbur/<str:au2>', au2TulburDashboard, name='au2TulburDashboard'),
    path('createAccount', createAccount, name='createAccount'),
]
