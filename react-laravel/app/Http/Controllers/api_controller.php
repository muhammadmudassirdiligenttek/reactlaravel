<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Termwind\Components\Dd;
use Illuminate\Contracts\Validation\Validator;

class api_controller extends Controller
{
    public function authApi()
    {
        $cars = [
            ['name' => 'Volvo'],
            ['name' => 'Saab'],
            ['name' => 'Mercedez'],
            ['name' => 'Honda']
        ];
        return $cars;
    }
    public function registerApi(Request $request)
    {
        $match = User::where('email', $request->email)->first();

        if ($match!=null) {
            return 0;
        } else {

            $save = new User();
            $save->name = $request->name;
            $save->email = $request->email;
            $save->password = $request->password;
            $save->save();
            return 1;
        }
    }
    public function postApi(Request $request)
    {
        $match = User::where('email', $request->email)->first();
        // return dd($match);
        if ($match != null) {
            return json_encode(1);
        } else {
            return json_encode(0);
        }
    }
}
