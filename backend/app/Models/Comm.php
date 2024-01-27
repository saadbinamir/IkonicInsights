<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comm extends Model
{
    use HasFactory;
    protected $table = 'comments';

    protected $fillable = ['user_id', 'feedback_id', 'content'];


    public function feedback()
    {
        return $this->belongsTo(Feedback::class, 'feedback_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
