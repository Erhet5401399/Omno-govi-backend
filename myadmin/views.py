from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout, get_user 
from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
# from django.core.urlresolvers import reverse_lazy


def login_page(request, error=None):
    context= {}
    if(error):
        print(error)
        context['data']=error
    return render(request,'login.html',context)

def admin_login(request):
    if request.method =='POST':
        username= request.POST.get('username')
        password= request.POST.get('password')

        user= authenticate(username=username, password=password)
        print(user)
        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('accounts')
    
    return render(request,'login.html', {"data": "Нэвтрэх нэр эсвэл нууц үг буруу байна"})


def admin_logout(request):
    logout(request)
    return HttpResponseRedirect('/myadmin/login')

@login_required(login_url='/myadmin/login')
def accounts(request):
    context={}
    userinfo=get_user(request)
    if userinfo.is_superuser:
        userList=User.objects.all()
        context['userList']=userList
    else:
        context['userList']= userinfo
    return render(request,'accounts.html', context)

@login_required(login_url='/myadmin/login')
def dashboard(request):
    query="""
            select 
            z.au2, z.landuse, count(*) cnt, sum(z.area) as area 
            , round(sum(t.payment),2) payment
            from tulbur t
            inner join zurchil_database_info z on z.gid = t.gid
            group by z.au2, z.landuse order by 1;
            """
    result = []
    with connection.cursor() as cursor:
        cursor.execute(query)
        rows = cursor.fetchall()
        for item in rows:
            record = {
            'name': item[0],
            'code': item[1],
            'count': item[2],
            'area': item[3],
            'payment': item[4],
            }
            result.append(record)   
    context= {"data": result}
    return render(request,'dashboard/dashboard.html', context)

@csrf_exempt
@login_required(login_url='/myadmin/login')
def au2TulburDashboard(request,au2):

    query="""
            select 
            z.au2, z.landuse, count(*) cnt, sum(z.area) as area 
            , round(sum(t.payment),2) payment
            from tulbur t
            inner join zurchil_database_info z on z.gid = t.gid
            where z.au2_code= %s
            group by z.au2, z.landuse order by 1;
            """
    result = []
    with connection.cursor() as cursor:
        cursor.execute(query,[au2])
        rows = cursor.fetchall()
        for item in rows:
            record = {
            'name': item[0],
            'code': item[1],
            'count': item[2],
            'area': item[3],
            'payment': item[4],
            }
            result.append(record)   
    context= {"data": result}
    return render(request, 'dashboard/_tulbur.html', context)

@login_required(login_url='/myadmin/login')
def createAccount(request):
    if request.method == 'POST':
        user= User()
        dm = User.objects.create_user(username=request.POST.get('username'), email=request.POST.get('email'), password=request.POST.get('password'))
        dm.first_name = request.POST.get('first_name')
        dm.last_name = request.POST.get('last_name')
        dm.is_superuser= False
        dm.save()
        # print(request.POST)
        # form_class = forms.UserCreateForm
        # success_url = reverse_lazy('login')
        # temlate_name = 'account/modal/create_modal.html'
        return HttpResponse("ok")
