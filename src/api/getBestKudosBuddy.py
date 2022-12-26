import json
import os
import requests
import time

import heapq # top numKudosBuddy

from collections import Counter
from strava_constants import activities_url, access_token, max_pagination

numKudosBuddy = 5

# # Get the response in json format
# response = requests.get(activities_url)
#
# people = Counter()
# for activity in response.json():
#     activity_id = activity["id"]
#     kudos_url = f"https://www.strava.com/api/v3/activities/{activity_id}/kudos?" \
#           f"access_token={access_token}" \
#           f"&per_page={max_pagination}"
#     response = requests.get(kudos_url).json()
#     for athlete in response:
#         people[(athlete["firstname"], athlete["lastname"])] += 1

# test data
test = Counter({('Bill', 'P.'): 12, ('Cletus', 'D.'): 11, ('Paige', 'B.'): 9, (' Ivan', 'R.'): 9, ('B', 'C.'): 9, ('Eleanor', 'L.'): 9, ('shufay', 'U.'): 9, ('Brett', 'P.'): 9, ('Yung', 'L.'): 8, ('Ellen', 'L.'): 8, ('Ben', 'A.'): 8, ('Kate', 'T.'): 8, ('Yü', 'W.'): 7, ('Arindam', 'K.'): 7, ('Luis', 'L.'): 7, ('In-Young', 'J.'): 7, ('Jaime', 'M.'): 6, ('Sunrise', 'T.'): 6, ('Tom', 'D.'): 5, ('Aanand', 'S.'): 5, ('Sophia', 'D.'): 5, ('Eric', 'N.'): 5, ('Ivan', 'M.'): 5, ('Jesus', 'R.'): 5, ('Romeo', 'J.'): 4, ('Ryan', 'W.'): 4, ('Greg', 'C.'): 4, ('Richey', 'B.'): 4, ('Andrew', 'N.'): 4, ('Chris', 'L.'): 3, ('Chante', 'D.'): 3, ('Esther', 'S.'): 3, ('Jason', 'M.'): 3, ('Casey', 'G.'): 3, ('Statesman', 'C.'): 3, ('Matthew', 'S.'): 3, ('Rusty', 'F.'): 3, ('Alexandra', 'H.'): 3, ('Bridget', 'O.'): 3, ('Eric', 'S.'): 3, ('Kevin', 'P.'): 3, ('Pamela', 'C.'): 3, ('Brendan', 'B.'): 3, ('Davenn', 'M.'): 3, ('Drew', 'D.'): 3, ('Dominique', 'C.'): 3, ('Chris', 'B.'): 2, ('Gus', 'M.'): 2, ('Jamie', 'P.'): 2, ('Joe', 'C.'): 2, ('Nick', 'K.'): 2, ('Dineth', 'J.'): 2, ('David', 'F.'): 2, ('Ferid', 'M.'): 1, ('Marvin', 'O.'): 1, ('Rick', 'G.'): 1, ('Justin', 'F.'): 1, ('Olimpio Neto -', '🇧.'): 1, ('Alejandro', 'F.'): 1, ('Casey', 'C.'): 1, ('Michael', 'W.'): 1, ('Sam', 'J.'): 1, ('Maggie', 'F.'): 1, ('Peter', 'M.'): 1, ('Vincent', 'L.'): 1, ('James', 'R.'): 1, ('Eric', 'L.'): 1, ('simon', 'C.'): 1, ('Rachel', 'W.'): 1, ('Nipun', 'B.'): 1})

# Top 5 Kudos Buddy
def getTopFive(people):
    heap = []
    for firstName, lastName in people:
        if len(heap) > numKudosBuddy and -people[(firstName, lastName)] < heap[0][0]:
            heapq.heappushpop(heap, (-people[(firstName, lastName)], firstName, lastName))
        else:
            heapq.heappush(heap, (-people[(firstName, lastName)], firstName, lastName))
    return heap

print("Top 5 Kudos buddies:")
for num, firstName, lastName in heapq.nsmallest(numKudosBuddy, getTopFive(test)):
    print(f"{firstName} {lastName} with {-num} kudos")
