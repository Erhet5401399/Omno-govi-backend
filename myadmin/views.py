from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout, get_user 
from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from users.models import ReportViolation
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
        userList=User.objects.all().order_by('id')
        context['userList']=userList
    else:
        context['userList']= [userinfo]
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
        # user= User()
        isSuper=False
        if(request.POST.get('admin') != None):
            isSuper=True
        
        dm = User.objects.create_user(username=request.POST.get('username'), email=request.POST.get('email'), password=request.POST.get('password'))
        dm.first_name = request.POST.get('first_name')
        dm.last_name = request.POST.get('last_name')
        dm.is_superuser= isSuper
        dm.save()
        return redirect('accounts')

@login_required(login_url='/myadmin/login')
def getAccountView(request, id):
    context={}
    user=User.objects.get(id=id)
    userinfo=get_user(request)

    context['user']=user
    context['myRole']=userinfo.is_superuser
    context['myId']=userinfo.id
    return render(request,'account/updateForm.html', context)

@login_required(login_url='/myadmin/login')
def updateAccount(request,id):
    if request.method == 'POST':
        # user= User()
        isSuper=False
        if(request.POST.get('admin') != None):
            isSuper=True
        
        dm = User.objects.get(id=id)

        dm.first_name = request.POST.get('first_name')
        dm.last_name = request.POST.get('last_name')
        dm.email = request.POST.get('email')
        # dm.username = request.POST.get('username')
        if request.POST.get('passwordUpdate'):
            dm.set_password = request.POST.get('passwordUpdate')
        dm.is_superuser= isSuper
        dm.save()
        return redirect('accounts')

@csrf_exempt
@login_required(login_url='/myadmin/login')
def checkAccountPwd(request,id):
    if request.method == 'POST':
        usr = User.objects.get(id=id)
        print('end', usr)
        print(usr.check_password(request.POST.get('pwd')))
        if usr.check_password(request.POST.get('pwd')):
            return JsonResponse({"status":"true", "data": "Зөв нууц үг"}, status=200)

    return JsonResponse({"status":"false", "data": "Нууц үг тохирсонгүй"}, status=200)
    
@login_required(login_url='/myadmin/login')
def deleteAccount(request, id):
    if request.method == 'GET':
        usr = User.objects.get(id=id)
        usr.delete()
        return JsonResponse({"status":"true", "data": "Амжилттай устгалаа"}, status=200)
    return JsonResponse({"status":"false", "data": "Устгаж чадсангүй"}, status=200)

@login_required(login_url='/myadmin/login')
def reports(request):
    print('end')
    context={}
    report= ReportViolation.objects.all()
    
    context['reportList']=report
    return render(request,'report.html', context)
