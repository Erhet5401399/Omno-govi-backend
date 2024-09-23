# 1. Python суулгах.

энэ project-ыг суулгахын тулд эхлээд python суулгах хэрэгтэй.
### Windows
    https://www.youtube.com/watch?v=TNAu6DvB9Ng&t=126s
### Linux
    sudo apt install -y python3-venv

# 2. Python virtual envirement суулгах.
Анхаарах зүйл бол git clone хийсэн folder дотор буюу **backend** folder бүхий folder-той нэг folder-т virtual envirement үүсгэх хэрэгтэй.
### Windows
    python -m venv django_env
### Linux
    python3 -m venv django_env

Энд үрдүн git clone хийсэн folder доторт дараах байдлаар харагдана.
- project
- django_env

гэсэн 2 фолдер үүсэн байна.
# 3. Virtual envirement идвэхжүүлэх.

### Linux дээр
    source django_env/bin/activate
### Windos дээр
    django_env/Scripts/activate

# 4. Django болон ашиглагдаж буй сангуудыг суулгах.   
cmd буюу command prompt-оор backend фолдер дотор ороод доорх коммандыг ажиллуулж сангуудыг суулгана.

    pip install -r requirements.txt

# 5. Django project ажилуулах.
Үндсэн folder-т одоо дараах 2 зүйл байгаа.
- backend **/ үндсэн project /**
- django_env **/ virtual envirement /**
  
  эндээс **backend** folder-т орно. Үүний дараагаар дараах коммандаар backend- ээ ажиллуулана.
  
#### linux дээр:
    python3 manage.py runserver

#### Windows дээр:
    python manage.py runserver
    