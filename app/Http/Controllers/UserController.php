<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return User[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        //
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $data = $request->all();
        $data['password'] = Hash::make('password');
        User::create($data);
        return response()->json(['data'=>$data]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $user = User::find($id);
        if ($user)
        {
            return response()->json(['data'=>'ok','user'=>$user],200);
        }
        else
        {
            return response()->json(['data'=>'error'],201);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $user = User::find($id);
        if ($user)
        {
            return $user;
        }
        else
        {
            return 'error';
        }

//        return User::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $a = User::findOrFail($id);
        $a->update($request->all());
        return response()->json(['data'=>'ok']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $a = User::find($id);
        if ($a)
        {
            $a->delete();
            return response()->json(['status'=>'ok']);
        }
        else
        {
            return response()->json(['status'=>$id]);
        }
    }

    public function login(Request $request)
    {
//        $loginData = $request->validate([
//            'email' => 'email|required',
//            'password' => 'required'
//        ]);
        $user = User::where('email',$request->email)->first();
        if ($user)
        {
            if(!auth()->attempt(['email'=>$request->email,'password'=>$request->password]))
            {
                return response()->json([
                    'error' => 'ok',
                    'message' => 'Invalid Password',
                ]);
            }
            else
            {
                $accessToken = $user->createToken('authToken')->accessToken;
                return response()->json([
                    'success' => 'ok',
                    'message' => $accessToken,
                    'name' => $user->name,
                ]);
            }
        }
        else{
            return response()->json([
                'error' => 'ok',
                'message' => 'Email Not Found',
            ]);
        }
    }

    public function loginUser()
    {
        return Auth::user();
    }

    public function logout()
    {
        $a =Auth::user()->token()->revoke();
        Auth::user()->token()->delete();
        return response()->json(['message'=>$a]);
    }
}
