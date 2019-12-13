from users.models import User

doe = User.objects.create_user(email="doe@example.com", password="secret")
