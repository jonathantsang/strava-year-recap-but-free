from django.shortcuts import get_object_or_404, render
import api.strava_constants

def index(request):
    if request.method == "GET": #and "code" in request:
        return render(request, "frontpage.html")
    elif request.method == 'POST':
        # import and run functions from API

        # Authorization URL
        request_url = f'http://www.strava.com/oauth/authorize' \
                          f'client_id={strava_constants.client_id}' \
                          f'&response_type=code&redirect_uri=http://localhost/' \
                          f'&approval_prompt=force' \
                          f'&scope=profile:read_all,activity:read_all'

        return request_url
        return render(request, 'frontpage.html')
